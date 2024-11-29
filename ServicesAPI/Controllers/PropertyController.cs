using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly IService<Property> _propertyService;
       private readonly IMapper _mapper;

    public PropertyController(IService<Property> propertyService, IMapper mapper)
    {
        _propertyService = propertyService;
          _mapper = mapper;
    }

    // GET: api/Property
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PropertyDTO>>> GetProperties()
    {
        var properties = await _propertyService.GetAllAsync();
        return Ok(_mapper.Map<IEnumerable<PropertyDTO>>(properties));
    }

    // GET: api/Property/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyDTO>> GetProperty(int id)
    {
        var property = await _propertyService.GetByIdAsync(id);
        if (property == null)
            return NotFound();

        return Ok(_mapper.Map<PropertyDTO>(property));
    }

    // POST: api/Property
    [HttpPost]
    public async Task<ActionResult<Property>> CreateProperty(CreatePropertyDTO property)
    {
        var createdProperty = await _propertyService.CreateAsync(_mapper.Map<Property>(property));
        return CreatedAtAction(nameof(GetProperty), new { id = createdProperty.Id }, createdProperty);
    }

    // PUT: api/Property/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProperty(int id, UpdatePropertyDTO property)
    {
        var updatedProperty = await _propertyService.UpdateAsync(id, _mapper.Map<Property>(property));
        if (updatedProperty == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/Property/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProperty(int id)
    {
        var isDeleted = await _propertyService.DeleteAsync(id);
        if (!isDeleted)
            return NotFound();

        return NoContent();
    }
}
