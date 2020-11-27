using Xunit;

namespace Api.Tests.Integration {

  /// <summary>
  /// Defines an Xunit Collection class for integrations.
  /// Its used to remove Parallelization when running fixtures.
  /// </summary>
  [CollectionDefinition("Integration", DisableParallelization = true)]
  public class IntegrationCollection  {}
}
