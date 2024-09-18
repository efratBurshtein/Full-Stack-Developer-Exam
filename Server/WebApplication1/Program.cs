using WebApplication1.DAL;
using WebApplication1.Services.Interfaces;
using WebApplication1.services;
using WebApplication1.Services;

var builder = WebApplication.CreateBuilder(args);
string myCors = "_myCors";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IDonationService, DonationService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IDonationRepository, DonationRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myCors,
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") 
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(myCors); 

app.UseAuthorization();

app.MapControllers();

app.Run();
