using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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

    /// <summary>
    /// Given a <see cref="HttpResponseMessage"/>,Json Deserialize the
    /// object to given generic type.
    /// </summary>
    /// <param name="response">The response to deserialize</param>
    /// <typeparam name="T">The type of object the response should be.</typeparam>
    /// <returns>The object instance or a json deserialization exception</returns>
    public static async Task<T> ResponseAsObject<T>(HttpResponseMessage response)
    {
      var body = await response.Content.ReadAsStringAsync();

      return JsonConvert.DeserializeObject<T>(body);
    }
  }
}
