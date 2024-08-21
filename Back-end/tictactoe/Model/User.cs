using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace tictactoe.Model
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string Name { get; set; }
        public long Wins { get; set; }
    }
}
