using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IService<Payment> _paymentService;

    public PaymentController(IService<Payment> paymentService)
    {
        _paymentService = paymentService;
    }

    // GET: api/Payment
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
        var payments = await _paymentService.GetAllAsync();
        return Ok(payments);
    }

    // GET: api/Payment/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Payment>> GetPayment(int id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        if (payment == null)
            return NotFound();

        return Ok(payment);
    }

    // POST: api/Payment
    [HttpPost]
    public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
    {
        var createdPayment = await _paymentService.CreateAsync(payment);
        return CreatedAtAction(nameof(GetPayment), new { id = createdPayment.Id }, createdPayment);
    }

    // PUT: api/Payment/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePayment(int id, Payment payment)
    {
        var updatedPayment = await _paymentService.UpdateAsync(id, payment);
        if (updatedPayment == null)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/Payment/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePayment(int id)
    {
        var isDeleted = await _paymentService.DeleteAsync(id);
        if (!isDeleted)
            return NotFound();

        return NoContent();
    }
}
