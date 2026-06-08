using CardSnap.Interfaces;
using System.Text.RegularExpressions;
using Tesseract;

namespace CardSnap.Services
{
    public class OcrService: IOcrService
    {
        private readonly string _tessdataPath;
        public OcrService(IWebHostEnvironment env)
        {
            _tessdataPath = Path.Combine(env.ContentRootPath, "TessData");
        }

        public async Task<string> ReadCardId(byte[] imageBytes)
        {
            var debugPath = Path.Combine(Path.GetTempPath(), "cardsnap_debug.jpg");
            await System.IO.File.WriteAllBytesAsync(debugPath, imageBytes);
            Console.WriteLine($"DEBUG image saved to: {debugPath}");


            using var engine = new TesseractEngine(_tessdataPath, "eng", EngineMode.Default);
            engine.SetVariable("tessedit_char_whitelist", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-");

            using var img = Pix.LoadFromMemory(imageBytes);

            var cardWidth = img.Width;
            var cardHeight = img.Height;

            var region = new Rect(
                x: (int)(cardWidth * 0.65),
                y: (int)(cardHeight * 0.80),
                width: (int)(cardWidth * 0.35),
                height: (int)(cardHeight * 0.20)
                );

            Console.WriteLine(region);

            using var page = engine.Process(img, region);

            var raw = page.GetText().Trim();

            Console.WriteLine(raw);
            return Regex.Replace(raw, @"\s+", "");
        }
    }
}
