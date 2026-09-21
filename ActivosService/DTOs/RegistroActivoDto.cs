namespace ActivosService.DTOs
{
    public class RegistroActivoDto
    {
        public required string Tipo { get; set;}
        public required string Detalle { get; set;}

        [System.ComponentModel.DataAnnotations.Range(0.01, double.MaxValue, ErrorMessage = "El precio de compra debe ser mayor a 0.")]
        public decimal Precio { get; set; }
        public DateTime FechaIngreso { get; set;}

    }
}