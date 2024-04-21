namespace dotnetWebAPI.Models
{
    public class LastCoordinates
    {
        public int Id { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }

        public User User { get; set; } = default!;
    }
}
