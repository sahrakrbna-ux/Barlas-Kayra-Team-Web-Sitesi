
import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

// 1. SUPABASE BAĞLANTI BİLGİLERİ

const SUPABASE_URL =
  "https://qzgcvmqsjhsfuqzkrgdz.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_TNz53p-NHBw4YnNr_0k7eQ_O047dxNf";

// 2. VERİTABANI BAĞLANTISI

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Supabase bağlantısı oluşturuldu.");

 // 3. BAŞVURU FORMUNU SEÇ

const form = document.getElementById("apply-form");
const result = document.getElementById("form-result");

// 4. FORM GÖNDERME İŞLEMİ

if (form && result) {

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    // FORM BİLGİLERİNİ AL

    const formData = new FormData(form);

    const application = {

      name: String(formData.get("name") || "").trim(),

      email: String(formData.get("email") || "").trim(),

      department: String(
        formData.get("department") || ""
      ).trim(),

      grade: String(formData.get("grade") || ""),

      area: String(formData.get("area") || ""),

      motivation: String(
        formData.get("motivation") || ""
      ).trim(),

      consent: form.querySelector("#privacy")?.checked
        ?? false

    };

    // BAŞVURU KAYDININ YAPILMASI

    const button = form.querySelector(
      'button[type="submit"]'
    );

    if (button) {
      button.disabled = true;
    }

    result.textContent = "Başvurunuz gönderiliyor...";

    try {

      const { error } = await supabase
        .from("applications")
        .insert(application);

      if (error) {
        throw error;
      }

      result.textContent =
        "Başvurunuz başarıyla alındı!";

      form.reset();

    } catch (error) {

      console.error("Başvuru hatası:", error);

      result.textContent =
        "Başvuru gönderilemedi. Lütfen tekrar deneyin.";

    } finally {

      if (button) {
        button.disabled = false;
      }

    }

  });

}
