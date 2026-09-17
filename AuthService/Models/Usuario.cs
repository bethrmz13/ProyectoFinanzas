namespace AuthService.Models
{
    public class Usuario
    {
        public int Id_Usu { get; set;}
        public string Email { get; set;}
        public string PasswordHash { get; set;}
        public string Rol { get; set;}
        public bool EstadoActivo { get; set;}
        public DateTime FechaCreacion { get; set;}
    }
}