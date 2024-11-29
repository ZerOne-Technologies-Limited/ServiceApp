using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class MachineController : ControllerBase
{
    private readonly IService<Machine> _machineService;
   private readonly IMapper _mapper;

    public MachineController(IService<Machine> machineService, IMapper mapper)
    {
        _machineService = machineService;
          _mapper = mapper;
    }

    // GET: api/Machine
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Machine>>> GetMachines()
    {
        var machines = await _machineService.GetAllAsync();
        return Ok(machines);
    }

    // GET: api/Machine/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Machine>> GetMachine(int id)
    {
        var machine = await _machineService.GetByIdAsync(id);
        if (machine == null) 
            return NotFound();

        return Ok(machine);
    }

        // GET: api/Machine/{id}
    [HttpGet("property/{id}")]
    public async Task<ActionResult<Machine>> GetAllMachinesAtProperty(int id)
    {
        var machines = await _machineService.GetAllAsync();
        var result = machines.Where(x => x.PropertyId == id);
        if (result == null)
            return NotFound();

        return Ok(result);
    }

    // POST: api/Machine
    [HttpPost]
    public async Task<ActionResult<Machine>> CreateMachine(CreateMachineDTO machine)
    {
        var createdMachine = await _machineService.CreateAsync(_mapper.Map<Machine>(machine));
        return CreatedAtAction(nameof(GetMachine), new { id = createdMachine.Id }, createdMachine);
    }

    // PUT: api/Machine/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMachine(int id, UpdateMachineDTO machine)
    {
        var updatedMachine = await _machineService.UpdateAsync(id, _mapper.Map<Machine>(machine));
        if (updatedMachine == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/Machine/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMachine(int id)
    {
        var isDeleted = await _machineService.DeleteAsync(id);
        if (!isDeleted)
            return NotFound();

        return NoContent();
    }
}

