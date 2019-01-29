package com.flower.utils;

import android.content.Context;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

/**
 * Created by hankins on 2019/1/29.
 */

public class ZipFloderUtil {
    public static final String TAG = ">>> Flower TAG >>>";

    public static void upZipFile(String zipFile, String folderPath) throws ZipException, IOException {
        ZipFile zfile = new ZipFile(zipFile);
        Enumeration zList = zfile.entries();

        ZipEntry ze = null;
        byte[] buf = new byte[1024];
        while (zList.hasMoreElements()) {
            ze = (ZipEntry) zList.nextElement();
            if (ze.isDirectory()) {
                Log.e(TAG, " ze.getName() =" + ze.getName());
                String dirStr = folderPath + ze.getName();


                dirStr = new String(dirStr.getBytes("8859_1"), "GB2312");
                Log.e(TAG, " dirStr -=->" + dirStr);
                File file = new File(dirStr);
                file.mkdir();
                continue;
            }
            Log.e(TAG, " ze.getName() -=-->" + ze.getName());
            OutputStream os = new BufferedOutputStream(new FileOutputStream(
                    getRealFileName(folderPath, ze.getName())));
            InputStream is = new BufferedInputStream(zfile.getInputStream(ze));
            int readLen = 0;
            while ((readLen = is.read(buf, 0, 1024)) != -1) {
                os.write(buf, 0, readLen);
            }
            is.close();
            os.close();
        }
        zfile.close();
        Log.e(TAG, " zipEnd ------");
    }

    public static File getRealFileName(String baseDir, String absFileName) {
        String[] dirs = absFileName.split("/");
        File ret = new File(baseDir);
        String subStr = null;
        if (dirs.length > 1) {
            for (int i = 0; i < dirs.length; i++) {
                subStr = dirs[i];

                try {
                    subStr = new String(subStr.getBytes("8859_1"), "GB2312");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                ret = new File(ret, subStr);
            }
            Log.e(TAG, " -=--1. ret -=-" + ret);
            if (!ret.exists()) {
                ret.exists();
            }
            subStr = dirs[dirs.length - 1];

            try {
                subStr = new String(subStr.getBytes("8859_1"), "GB2312");
                Log.e(TAG, " -=-=--" + subStr);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            ret = new File(ret, subStr);
            Log.e(TAG, " -=--2. ret -=-" + ret);
            return ret;
        }

        return ret;
    }

    public static void UnZipAssetsFolder(
            Context context, String zipFileString, String outPathString) throws Exception {
        ZipInputStream inZip = new ZipInputStream(context.getAssets().open(zipFileString));
        Log.e(TAG, " == inZip -=-->" + inZip);

        ZipEntry zipEntry;
        String szName = "";
        while ((zipEntry = inZip.getNextEntry()) != null) {
            szName = zipEntry.getName();
            if (zipEntry.isDirectory()) {
                szName = szName.substring(0, szName.length() - 1);
                File folder = new File(outPathString + File.separator + szName);
                folder.mkdirs();

            } else {
                Log.e(TAG, " -=-=--- outPathString -=-=>" + outPathString + File.separator + szName);
                File file = new File(outPathString + File.separator + szName);
                if (!file.exists()) {
                    Log.e(TAG, "Create the file:" + outPathString + File.separator + szName);
                    file.getParentFile().mkdirs();
                    file.createNewFile();
                }

                // 获取文件的输出流
                FileOutputStream out = new FileOutputStream(file);
                int len;
                byte[] buffer = new byte[1024];
                // 读取（字节）字节到缓冲区
                while ((len = inZip.read(buffer)) != -1) {
                    // 从缓冲区（0）位置写入（字节）字节
                    out.write(buffer, 0, len);
                    out.flush();
                }
                out.close();
            }
        }
        inZip.close();
    }

    public static void UnZipFile(Context context, String destDirName, InputStream stream) {
        ZipInputStream inZip = null;
        try {
            //将字节读取流转成zip读取流
            inZip = new ZipInputStream(stream);
            //压缩文件实体
            ZipEntry zipEntry;
            //压缩文件实体中的文件名称
            String szName = "";
            while ((zipEntry = inZip.getNextEntry()) != null) {
                szName = zipEntry.getName();
                if (zipEntry.isDirectory()) {
                    //zipEntry是目录,则创建目录
                    szName = szName.substring(0, szName.length() - 1);
                    File folder = new File(destDirName, szName);

                    Log.e(TAG, "==== folder -=->" + folder);

                    if (!folder.exists()) {
                        folder.mkdirs();
                    }
                } else {
                    //否则创建文件,并输出文件的内容
                    File file = new File(destDirName, szName);
                    file.createNewFile();
                    FileOutputStream out = new FileOutputStream(file);
                    int len;
                    byte[] buffer = new byte[1024];
                    while ((len = inZip.read(buffer)) != -1) {
                        out.write(buffer, 0, len);
                        out.flush();
                    }
                    out.close();
                }
            }

            Log.e(TAG, "==== szName -=->" + szName);

        } catch (Exception e) {
            e.printStackTrace();
            Log.e(TAG, "==== Exception -=->" + e);
        } finally {
            if (inZip != null) {
                try {
                    inZip.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
