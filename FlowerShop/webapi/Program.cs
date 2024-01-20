using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Configuration;
using Serilog;
using webapi.Data;
using Newtonsoft.Json.Linq;

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
builder.Services.AddControllers();
builder.Services.AddControllersWithViews().AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
//как я поняла здесь можно написать куда отправлять логи
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
    //настраивается отправка статических веб-страниц по умолчанию без обращения к ним по полному пути
    app.UseDefaultFiles();
}

app.UseStaticFiles();

app.UseCors(nameCors);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

try
{
    Log.Information("Приложение запущено");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Приложение не запутсилось!");
    throw;
}
finally {
    //лог проверит записи и закроет точку
    Log.CloseAndFlush();
}