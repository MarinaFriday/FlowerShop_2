using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Configuration;
using Serilog;
using webapi.Data;
using Newtonsoft.Json.Linq;
using System.Text.Json.Serialization;
using webapi.Services.PasswordChecker;
using webapi.Services.Criptographer;
using webapi.Services.Cryptographer;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using webapi.Authentication;

var nameCors = "FS3000";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Host.UseSerilog();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: nameCors,
    policy =>
    {
        policy
        .WithOrigins("https://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); 
//builder.Services.AddControllersWithViews().AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddControllersWithViews().AddJsonOptions(x=>x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "јвторизаци€ с помощью JWT-токена. \r\n\r\n ѕример 'Bearer' [ѕробел] JWT-токен.\r\n\r\nѕример: \"Bearer yJhbGciOiJIU\"",
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                    }
                },
                new string[] {}
            }
    });
});
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<ICryptographer, md5Cryptographer>();
builder.Services.AddTransient<IPasswordChecker, PasswordChecker>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // ”казывает будет ли валидироватьс€ издатель при валидации токена
            ValidateIssuer = true,
            // строка представл€юща€ издател€
            ValidIssuer = AuthOptions.ISSUER,

            // будет ли валидироватьс€ потребитель токена
            ValidateAudience = true,
            // установка потребител€ токена
            ValidAudience = AuthOptions.AUDINCE,
            // будет ли валидироватьс€ врем€ существовани€
            ValidateLifetime = true,

            // установка ключа безопасности
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // валидаци€ ключа безопасности
            ValidateIssuerSigningKey = true,
        };
    });


var app = builder.Build();

var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
//как € пон€ла здесь можно написать куда отправл€ть логи
Log.Logger = (Serilog.ILogger)new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{   
    //используем ведение журнала запросов
    app.UseSerilogRequestLogging();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else {
    //настраиваетс€ отправка статических веб-страниц по умолчанию без обращени€ к ним по полному пути
    app.UseDefaultFiles();
}

app.UseStaticFiles();

app.UseCors(nameCors);

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

try
{
    Log.Information("ѕриложение запущено");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "ѕриложение не запутсилось!");
    throw;
}
finally {
    //лог проверит записи и закроет точку
    Log.CloseAndFlush();
}