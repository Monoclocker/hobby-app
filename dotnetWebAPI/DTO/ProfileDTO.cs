using dotnetWebAPI.Models;

namespace dotnetWebAPI.DTO
{
    public class ProfileDTO
    {
        public string username = default!;
        public string? about { get; set; }
        public string? photo { get; set; }
        public int age { get; set; }
        public string? cityName { get; set; }
        public string? links { get; set; }
        public List<string> interests { get; set; } = new();
    }
}
