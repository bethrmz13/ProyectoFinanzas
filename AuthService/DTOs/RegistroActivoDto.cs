namespace AuthService.DTOs
{
    public class RegistroActivoDto
    {
        public string Tipo { get; set;}
        public string Detalle { get; set;}
        public decimal Precio { get; set;}
        public DateTime FechaIngreso { get; set;}
        public DateTime FechaCorte { get; set;}
    }
}