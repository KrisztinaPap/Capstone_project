using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace Api.Tests {
  /// <summary>
  /// Provides various HTTP Helper methods used during testing.
  /// </summary>
  public static class HttpHelper {
    /// <summary>
    /// Converts objects to JSON Strings which are used to POST
    /// to an API.
    /// </summary>
    /// <param name="obj">The object that is to be turned into a string</param>
    /// <returns>StringContent instance to be used HttpClient methods</returns>
    public static StringContent AsStringContent(object obj)
    {
      return new StringContent(
        JsonConvert.SerializeObject(obj),
        Encoding.UTF8,
        "application/json"
      );
    }
  }
}
