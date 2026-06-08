using CardSnap.Interfaces;
using CardSnap.Services;

namespace CardSnap.Extension
{
    public static class ServiceExtension
    {

        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IOcrService, OcrService>();
        }

    }
}
