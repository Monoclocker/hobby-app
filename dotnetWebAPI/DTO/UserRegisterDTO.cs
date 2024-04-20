namespace dotnetWebAPI.DTO
{
    public class UserRegisterDTO : ProfileDTO
    {
        public required string email { get; set; }
        public required string password { get; set; }
    }
}
