namespace dotnetWebAPI.DTO
{
    public class PlaceDTO
    {
        public string name { get; set; } = default!;
        public List<string> interests { get; set; } = default!;
        public List<float> coordinates { get; set; } = default!;
    }
}
