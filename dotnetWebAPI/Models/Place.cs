namespace dotnetWebAPI.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public float Latitude { get; set; }
        public float Longtitude { get; set; }
        public List<Interest> Interests { get; set; } = new List<Interest>();

    }
}
