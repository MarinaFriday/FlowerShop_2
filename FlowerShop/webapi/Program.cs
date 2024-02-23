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
        Description = "����������� � ������� JWT-������. \r\n\r\n ������ 'Bearer' [������] JWT-�����.\r\n\r\n������: \"Bearer yJhbGciOiJIU\"",
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
            // ��������� ����� �� �������������� �������� ��� ��������� ������
            ValidateIssuer = true,
            // ������ �������������� ��������
            ValidIssuer = AuthOptions.ISSUER,

            // ����� �� �������������� ����������� ������
            ValidateAudience = true,
            // ��������� ����������� ������
            ValidAudience = AuthOptions.AUDINCE,
            // ����� �� �������������� ����� �������������
            ValidateLifetime = true,

            // ��������� ����� ������������
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // ��������� ����� ������������
            ValidateIssuerSigningKey = true,
        };
    });


var app = builder.Build();

var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
//��� � ������ ����� ����� �������� ���� ���������� ����
Log.Logger = (Serilog.ILogger)new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{   
    //���������� ������� ������� ��������
    app.UseSerilogRequestLogging();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else {
    //������������� �������� ����������� ���-������� �� ��������� ��� ��������� � ��� �� ������� ����
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
    Log.Information("���������� ��������");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "���������� �� �����������!");
    throw;
}
finally {
    //��� �������� ������ � ������� �����
    Log.CloseAndFlush();
}