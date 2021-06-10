using System;
using AgriApi.Entities.Identity;
using AgriApi.Models;

namespace AgriApi.Interfaces
{
    public interface IAuthentication
    {
        Tuple<bool, object> Authenticate(AuthenticateRequest model);
    }
}