using Microsoft.EntityFrameworkCore;
using PM.Api.Contractors;
using PM.Api.DataAccess;
using PM.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DEV_SQL_CON");
builder.Services.AddDbContext<PMDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICarService, CarService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy",
                        policy =>
                        {
                            policy.WithOrigins("*")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Policy");

app.UseAuthorization();

app.MapControllers();

app.Run();
