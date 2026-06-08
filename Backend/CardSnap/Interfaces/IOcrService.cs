namespace CardSnap.Interfaces
{
    public interface IOcrService
    {
        Task<string> ReadCardId(byte[] imageBytes);
    }
}
