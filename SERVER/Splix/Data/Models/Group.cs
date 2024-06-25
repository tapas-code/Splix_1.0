namespace Splix.Data.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<Member> Members { get; set; }
    }
}
