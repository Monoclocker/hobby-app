using dotnetWebAPI.Models;

namespace dotnetWebAPI.DTO
{
    public class ProfileDTO
    {
        public string? username { get; set; }
        public string? about { get; set; }
        public int age { get; set; }
        public string? cityName { get; set; }
        public List<string>? links { get; set; } = new List<string>();
        public List<string>? interests { get; set; } = new();
        public string? photo { get; set; }
    }
}
