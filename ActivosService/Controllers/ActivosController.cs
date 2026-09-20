using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;
using ActivosService.DTOs;

namespace ActivosService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ActivosController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ActivosController(IConfiguration config)
        {
            _config = config; //conexion con appsettings.json
        }

        [HttpPost("registrar")]
        public IActionResult RegistrarActivo([FromBody] RegistroActivoDto activoDto)
        {
            Console.WriteLine($"\n--- NUEVO ACTIVO AÑADIDO ---");
            Console.WriteLine($"Tipo: {activoDto.Tipo}");
            Console.WriteLine($"Fecha de Compra: {activoDto.FechaIngreso}");
            Console.WriteLine($"Fecha de Corte: {activoDto.FechaCorte}\n");
            
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            var sql = @"
                INSERT INTO auth.Activos (Tipo, Detalle, Precio, FechaIngreso) VALUES
                (@Tipo, @Detalle, @Precio, @FechaIngreso)";

            var filasAfectadas = connection.Execute(sql, activoDto);

            if(filasAfectadas > 0)
            {
                return Ok(new { mensaje = "Activo registrado correctamente en la base de datos."});
            } 

            return BadRequest(new {mensaje = "Hubo un error al guardar el activo."});
        }

    }
}