using System.Text.Json.Serialization;

namespace Splix.Data.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public List<Group> Groups { get; set; } 
    }
}
