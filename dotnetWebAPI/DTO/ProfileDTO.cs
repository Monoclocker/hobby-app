using dotnetWebAPI.Models;

namespace dotnetWebAPI.DTO
{
    public class ProfileDTO
    {
        public string username { get; set; } = default!;
        public string? about { get; set; }
        public int age { get; set; }
        public string cityName { get; set; } = default!;
        public string? links { get; set; }
        public List<string> interests { get; set; } = new();
        public byte[]? photo { get; set; }
    }
}
