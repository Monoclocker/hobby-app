namespace dotnetWebAPI.DTO
{
    public class UserRegisterDTO
    {
        public required string email { get; set; }
        public required string password { get; set; }
        public string username { get; set; } = default!;
        public string? about { get; set; }
        public int age { get; set; }
        public string cityName { get; set; } = default!;
        public List<string>? links { get; set; } = new List<string>();
        public List<string> interests { get; set; } = new();
        public string? photo {  get; set; }

    }
}
