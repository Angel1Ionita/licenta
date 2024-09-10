package com.angelionita.licenta.service;

import com.angelionita.licenta.entity.PasswordResetToken;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendPasswordResetEmail(PasswordResetToken passwordResetToken) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom("angel.ionita.24@gmail.com");
        message.setRecipients(MimeMessage.RecipientType.TO, passwordResetToken.getUser().getEmail());

        message.setSubject("Cerere de resetare parola");

        String URL = "'http://localhost:4200/reset-password?token=" + passwordResetToken.getToken() + "'";

        String htmlContent =
                "<h1>Cerere de resetare a parolei</h1>" +
                        "<p>O cerere de resetare a parolei a fost efectuata pentru contul MedHub al acestei adrese de email.</p>" +
                        "<p>Daca nu ati efectuat aceasta cerere, putegi ignora acest email.</p>" +
                        String.format("<a href=%s>Apasa aici pentru a schimba parola</a>", URL);

        message.setContent(htmlContent, "text/html; charset=utf-8");

        mailSender.send(message);
    }
}
