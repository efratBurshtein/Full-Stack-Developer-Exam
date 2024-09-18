using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using DotNetEnv;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services
{
    public class EmailService : IEmailService
    {
        // SMTP server configuration
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;

        public EmailService()
        {
            // Load environment variables from .env file
            Env.Load();

            // SMTP server configuration from environment variables
            _smtpServer = Env.GetString("SMTP_SERVER");
            _smtpPort = Env.GetInt("SMTP_PORT");
            _smtpUser = Env.GetString("SMTP_USER");
            _smtpPass = Env.GetString("SMTP_PASS");
        }

        // Sends an email asynchronously
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            using (var smtpClient = new SmtpClient(_smtpServer, _smtpPort))
            {
                smtpClient.Credentials = new NetworkCredential(_smtpUser, _smtpPass);
                smtpClient.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_smtpUser),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(to);

                try
                {
                    await smtpClient.SendMailAsync(mailMessage);  // Send the email
                }
                catch (SmtpException ex)
                {
                    throw new InvalidOperationException("Error sending email", ex);  // Handle sending errors
                }
            }
        }
    }
}
