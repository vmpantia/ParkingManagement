namespace PM.Api.Models
{
    public class FilterSetting
    {
        public string Value { get; set; }
        public int PageSize { get; set; }
        public int PageNo { get; set; }
        public DateTime? DateFrom { get; set; } 
        public DateTime? DateTo { get; set; }
    }
}
