using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CarFix.Project.Utils
{
    public class Upload
    {
        public string UploadFile(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fileExtension = Path.GetExtension(file.FileName);
                
                if(fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".jfif" 
                || fileExtension == ".png" || fileExtension == ".svg")
                {
                    if (file.Length > 0)
                    {
                        var fileName = new string(Path.GetFileNameWithoutExtension(file.FileName).ToArray()).Replace(' ', '-');
                        fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

                        var extension = Path.GetExtension(file.FileName);
                        var fullPath = Path.Combine(pathToSave, fileName);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return fileName;
                    }
                    else
                    {
                        return "Invalid File";
                    }
                }
                else
                {
                    return "Invalid File Type";
                }

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }


        }

        public string DeleteFile(string fileName)
        {
            try
            {
                var folderName = Path.Combine("Images");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (File.Exists(Path.Combine(filePath, fileName)))
                {
                    File.Delete(Path.Combine(filePath, fileName));
                    return fileName + " Deleted";
                }
                else
                {
                    return "File not Found";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

    }
}
