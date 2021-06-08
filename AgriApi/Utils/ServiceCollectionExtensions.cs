using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Services.Identity;
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
            services.AddSingleton<ProductService>();
            services.AddSingleton<CategoryService>();
            services.AddSingleton<CartService>();
            services.AddSingleton<CommentService>();
            services.AddSingleton<QuotationRequestService>();
            services.AddSingleton<QuotationService>();

            return services;
        }

        public static IServiceCollection AddConfigOptions(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AgriDealDatabaseSettings>(config.GetSection(nameof(AgriDealDatabaseSettings)));
            
            return services;
        }
    }
}