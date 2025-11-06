
using Backend_Rumos_Project.Models; 


namespace Backend_Rumos_Project.Models
{
    
    public class Recipe 
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string PrepTime { get; set; } = string.Empty; 
        public string Difficulty { get; set; } = string.Empty; 
        public string Instructions { get; set; } = string.Empty;

        
        public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    } 
} 