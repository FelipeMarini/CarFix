using CarFix.Project.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    interface IServiceImageRepository
    {
        List<ServiceImage> ListAllImages();
        ServiceImage? FindServiceImage(Guid idServiceImage);
        List<ServiceImage>? FindImagesPerService(Guid idService);
        void Register(ServiceImage newServiceImage);
        void Update(ServiceImage updatedServiceImage);
        void Delete(Guid idServiceImage);
    }
}
