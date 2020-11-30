using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
  public class Image
  {
    public string FileName { get; set; }
    public IFormFile Photo { get; set; }

    public Image()
    {
    }
  }
}
