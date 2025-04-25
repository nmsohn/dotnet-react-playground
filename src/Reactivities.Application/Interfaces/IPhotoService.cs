using Microsoft.AspNetCore.Http;
using Reactivities.Application.Users.Dtos;

namespace Reactivities.Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}