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