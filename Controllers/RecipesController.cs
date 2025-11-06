
using Microsoft.AspNetCore.Mvc;
using Backend_Rumos_Project.Data; // To use ApiDbContext
using Backend_Rumos_Project.Models; // To use Recipe and Ingredient models
using Microsoft.EntityFrameworkCore; // To use database methods (ToListAsync, etc.)

namespace Backend_Rumos_Project.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class RecipesController : ControllerBase 
    {
        private readonly ApiDbContext _context; 

        
        public RecipesController(ApiDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            
            if (_context.Recipes == null)
            {
                
                return NotFound();
            }
    
            
            return await _context.Recipes
                .Include(r => r.Ingredients) 
                .ToListAsync();
        }
        
        // --- POST (CREATE) Endpoint ---

        
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipe",
                "Recipes",
                new { id = recipe.Id }, recipe);
        }

        // --- PUT (UPDATE) Endpoint ---

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe updatedRecipe)
        {
            if (id != updatedRecipe.Id)
            {
                return BadRequest();
            }

           

            
            _context.Entry(updatedRecipe).State = EntityState.Modified;
        
            
        
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Recipes.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent(); 
        }
    }
    }

