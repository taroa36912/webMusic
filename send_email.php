<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "yoyoyono.yo88893@gmail.com";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_body = "名前: $name\n";
    $email_body .= "メールアドレス: $email\n\n";
    $email_body .= "メッセージ:\n$message";
    
    if (mail($to, $subject, $email_body, $headers)) {
        echo "<script>
            alert('お問い合わせありがとうございます。メッセージが送信されました。');
            window.location.href = 'index.html';
        </script>";
    } else {
        echo "<script>
            alert('申し訳ありませんが、メッセージの送信に失敗しました。もう一度お試しください。');
            window.history.back();
        </script>";
    }
} else {
    header("Location: contact.html");
    exit();
}
?>