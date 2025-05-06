using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;

namespace API.Errors
{
    public class GlobalExecptionHandler(ILogger<GlobalExecptionHandler> logger, IHostEnvironment env) : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception ex, CancellationToken cancellationToken)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace.ToString())
                : new ApiException(context.Response.StatusCode, "Internal Server Error", null);

            logger.LogError(ex, ex.Message);
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
            return true;
        }
    }
}
