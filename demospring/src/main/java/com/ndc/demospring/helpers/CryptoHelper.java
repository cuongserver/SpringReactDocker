package com.ndc.demospring.helpers;

import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.UUID;

@Component
public class CryptoHelper {
    public String createSalt() {
        try{
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            String randomString = UUID.randomUUID().toString();
            crypt.update(randomString.getBytes(StandardCharsets.UTF_8));
            return new BigInteger(1, crypt.digest()).toString(16);
        }
        catch(NoSuchAlgorithmException e)
        {
            return "";
        }
    }
    public String createHash(String password, String salt) {
        try {
            byte[] saltBytes = salt.getBytes();
            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), saltBytes, 10, 256);
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            byte[] passwordHash = skf.generateSecret(spec).getEncoded();
            return String.valueOf(Hex.encode(passwordHash));
        }
        catch (NoSuchAlgorithmException | InvalidKeySpecException e)
        {
            return "";
        }
    }

}
