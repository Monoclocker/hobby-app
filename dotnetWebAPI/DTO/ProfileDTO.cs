using dotnetWebAPI.Models;

namespace dotnetWebAPI.DTO
{
    public class ProfileDTO
    {
        public string? about { get; set; }
        public string? photo { get; set; }
        public int age { get; set; }
        public string? cityName { get; set; }
        public string? links { get; set; }
    }
}
