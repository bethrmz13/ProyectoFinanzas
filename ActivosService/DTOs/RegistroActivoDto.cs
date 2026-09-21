namespace ActivosService.DTOs
{
    public class RegistroActivoDto
    {
        public required string Tipo { get; set;}
        public required string Detalle { get; set;}
        public decimal Precio { get; set;}
        public DateTime FechaIngreso { get; set;}

    }
}