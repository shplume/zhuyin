// 配置项接口
interface ImageCaptchaOptions {
  width: number;
  height: number;
  characters: string;
  length: number;
  fontSize: number;
  color: string;
  noiseCount: number;
  noiseColor?: string; // 可选的干扰线颜色，默认可以与字体颜色一致
}

class imageCaptcha {
  private captchaText: string;
  private options: Required<ImageCaptchaOptions>;

  constructor(options: Partial<ImageCaptchaOptions> = {}) {
    this.options = {
      width: 120,
      height: 40,
      characters:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      length: 4,
      fontSize: 30,
      color: '#000',
      noiseCount: 25,
      noiseColor: '#ccc',
      ...options // 合并用户自定义选项
    };

    this.captchaText = this.generateRandomCode();
  }

  generateRandomCode(): string {
    let captchaStr = '';
    for (let i = 0; i < this.options.length; i++) {
      captchaStr += this.options.characters.charAt(
        Math.floor(Math.random() * this.options.characters.length)
      );
    }
    return captchaStr;
  }

  createCaptchaImage(): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 设置字体样式
      ctx.font = `${this.options.fontSize}px Arial`;
      ctx.fillStyle = this.options.color;

      // 绘制验证码文字
      let x = 10;
      for (let i = 0; i < this.options.length; i++) {
        ctx.fillText(this.captchaText[i], x, this.options.fontSize);
        x += ctx.measureText(this.captchaText[i]).width + 10;
      }

      // 添加干扰线
      for (let i = 0; i < this.options.noiseCount; i++) {
        ctx.strokeStyle = this.options.noiseColor;
        ctx.beginPath();
        ctx.moveTo(
          Math.random() * this.options.width,
          Math.random() * this.options.height
        );
        ctx.lineTo(
          Math.random() * this.options.width,
          Math.random() * this.options.height
        );
        ctx.stroke();
      }
    } else {
      console.error(
        'Canvas element was not found or does not support 2D rendering.'
      );
    }

    // 将canvas转为图片
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob: Blob | null) => {
        if (blob !== null) {
          resolve(blob as Blob);
        } else {
          reject(new Error('Failed to create a Blob from the canvas.'));
        }
      }, 'image/png');
    });
  }

  async getCaptchaImageUrl(): Promise<string> {
    const blob = await this.createCaptchaImage();
    return URL.createObjectURL(blob);
  }
}

export { imageCaptcha };
