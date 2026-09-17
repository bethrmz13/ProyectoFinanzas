namespace AuthServicio.Models
{
    public class EstadoActivo
    {
        public int Id_Activo { get; set;}
        public string Tipo{ get; set;}
        public string Detalle { get; set;}
        public string Precio { get; set;}
        public DateTime FechaIngreso { get; set;}
        public bool EstadoActivo { get; set}
    }
}