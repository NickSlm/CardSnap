using CardSnap.Interfaces;
using System.Text.RegularExpressions;
using Tesseract;
using SkiaSharp;

using OpenCvSharp;
using System.Threading;


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
            using var skBitmap = SKBitmap.Decode(imageBytes);
            using var skImage = SKImage.FromBitmap(skBitmap);

            using var skData = skImage.Encode(SKEncodedImageFormat.Jpeg, 95);

            var jpegBytes = skData.ToArray();


            await System.IO.File.WriteAllBytesAsync(
    Path.Combine("\\TCGPROJECT\\CardSnap\\ImageTest\\", "cardsnap_debug.jpg"), jpegBytes);

            using var src = Cv2.ImDecode(jpegBytes, ImreadModes.Color);

            using var resized = new Mat();
            Cv2.Resize(src, resized, new Size(src.Width * 4, src.Height * 4),
                       interpolation: InterpolationFlags.Lanczos4);

            using var gray = new Mat();
            Cv2.CvtColor(resized, gray, ColorConversionCodes.BGR2GRAY);

            using var thresh = new Mat();
            Cv2.Threshold(gray, thresh, 0, 255, ThresholdTypes.Binary | ThresholdTypes.Otsu);

            Cv2.ImWrite(Path.Combine("\\TCGPROJECT\\CardSnap\\ImageTest\\", "cardsnap_processed.jpg"), thresh);

            Cv2.ImEncode(".png", thresh, out var processedBytes);

            using var engine = new TesseractEngine(_tessdataPath, "eng", EngineMode.LstmOnly);
            engine.SetVariable("tessedit_char_whitelist", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-");
            engine.SetVariable("tessedit_pageseg_mode", "7");

            using var img = Pix.LoadFromMemory(processedBytes);
            using var page = engine.Process(img);
            var raw = page.GetText().Trim();
            Console.WriteLine($"Raw OCR: '{raw}'");

            var cleaned = Regex.Replace(raw, @"\s+", "");
            var match = Regex.Match(cleaned, @"[A-Z]{2}\d{2}-\d{3}");
            return match.Success ? match.Value : string.Empty;
        }
   
    }
}
