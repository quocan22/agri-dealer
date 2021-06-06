using AgriApi.Entities;
using AgriApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace AgriApi.Utils
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseService(this IServiceCollection services)
        {
            services.AddSingleton<IAgriDealDatabaseSettings>(sp =>
              sp.GetRequiredService<IOptions<AgriDealDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();

            return services;
        }

        public static IServiceCollection AddConfigOptions(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AgriDealDatabaseSettings>(config.GetSection(nameof(AgriDealDatabaseSettings)));
            
            return services;
        }
    }
}