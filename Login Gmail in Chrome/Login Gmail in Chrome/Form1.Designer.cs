namespace Login_Gmail_in_Chrome
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.btn_file_gmail = new System.Windows.Forms.Button();
            this.txt_gmail = new System.Windows.Forms.TextBox();
            this.btn_load_setting = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.btn_div_chrome = new System.Windows.Forms.Button();
            this.txt_chrome = new System.Windows.Forms.TextBox();
            this.lbl_status = new System.Windows.Forms.Label();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.txt_type_ip = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.txt_type_ip_value = new System.Windows.Forms.TextBox();
            this.btn_load_gmail = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.txt_type_data = new System.Windows.Forms.ComboBox();
            this.txt_token_auth = new System.Windows.Forms.TextBox();
            this.btn_save = new System.Windows.Forms.Button();
            this.txt_channel = new System.Windows.Forms.TextBox();
            this.btn_search = new System.Windows.Forms.Button();
            this.btn_extension = new System.Windows.Forms.Button();
            this.txt_extension = new System.Windows.Forms.TextBox();
            this.cbb_gmail_status = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.btn_start_register = new System.Windows.Forms.Button();
            this.cbb_very_phone = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // btn_file_gmail
            // 
            this.btn_file_gmail.Location = new System.Drawing.Point(12, 133);
            this.btn_file_gmail.Name = "btn_file_gmail";
            this.btn_file_gmail.Size = new System.Drawing.Size(75, 23);
            this.btn_file_gmail.TabIndex = 0;
            this.btn_file_gmail.Text = "File Gmail";
            this.btn_file_gmail.UseVisualStyleBackColor = true;
            this.btn_file_gmail.Click += new System.EventHandler(this.btn_file_gmail_Click);
            // 
            // txt_gmail
            // 
            this.txt_gmail.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_gmail.Location = new System.Drawing.Point(93, 135);
            this.txt_gmail.Name = "txt_gmail";
            this.txt_gmail.Size = new System.Drawing.Size(601, 20);
            this.txt_gmail.TabIndex = 1;
            this.txt_gmail.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // btn_load_setting
            // 
            this.btn_load_setting.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btn_load_setting.BackColor = System.Drawing.Color.LightSkyBlue;
            this.btn_load_setting.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_load_setting.ForeColor = System.Drawing.SystemColors.HighlightText;
            this.btn_load_setting.Location = new System.Drawing.Point(411, 342);
            this.btn_load_setting.Name = "btn_load_setting";
            this.btn_load_setting.Size = new System.Drawing.Size(96, 34);
            this.btn_load_setting.TabIndex = 2;
            this.btn_load_setting.Text = "Load Setting";
            this.btn_load_setting.UseVisualStyleBackColor = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(11, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(63, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "Token Auth";
            // 
            // btn_div_chrome
            // 
            this.btn_div_chrome.Location = new System.Drawing.Point(12, 159);
            this.btn_div_chrome.Name = "btn_div_chrome";
            this.btn_div_chrome.Size = new System.Drawing.Size(75, 23);
            this.btn_div_chrome.TabIndex = 0;
            this.btn_div_chrome.Text = "Div Chrome";
            this.btn_div_chrome.UseVisualStyleBackColor = true;
            this.btn_div_chrome.Click += new System.EventHandler(this.btn_div_chrome_Click);
            // 
            // txt_chrome
            // 
            this.txt_chrome.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_chrome.Location = new System.Drawing.Point(93, 161);
            this.txt_chrome.Name = "txt_chrome";
            this.txt_chrome.Size = new System.Drawing.Size(601, 20);
            this.txt_chrome.TabIndex = 1;
            this.txt_chrome.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // lbl_status
            // 
            this.lbl_status.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lbl_status.AutoSize = true;
            this.lbl_status.Location = new System.Drawing.Point(11, 353);
            this.lbl_status.Name = "lbl_status";
            this.lbl_status.Size = new System.Drawing.Size(60, 13);
            this.lbl_status.TabIndex = 5;
            this.lbl_status.Text = "Status: 0/0";
            // 
            // progressBar1
            // 
            this.progressBar1.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.progressBar1.Location = new System.Drawing.Point(14, 382);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(680, 10);
            this.progressBar1.TabIndex = 6;
            // 
            // txt_type_ip
            // 
            this.txt_type_ip.FormattingEnabled = true;
            this.txt_type_ip.Items.AddRange(new object[] {
            "none",
            "smartproxy",
            "socks5",
            "proxy list",
            "proxy"});
            this.txt_type_ip.Location = new System.Drawing.Point(93, 222);
            this.txt_type_ip.Name = "txt_type_ip";
            this.txt_type_ip.Size = new System.Drawing.Size(181, 21);
            this.txt_type_ip.TabIndex = 7;
            this.txt_type_ip.Text = "none";
            this.txt_type_ip.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(9, 225);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(17, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "IP";
            // 
            // label4
            // 
            this.label4.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(473, 225);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(34, 13);
            this.label4.TabIndex = 3;
            this.label4.Text = "Value";
            // 
            // txt_type_ip_value
            // 
            this.txt_type_ip_value.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_type_ip_value.Location = new System.Drawing.Point(515, 222);
            this.txt_type_ip_value.Name = "txt_type_ip_value";
            this.txt_type_ip_value.Size = new System.Drawing.Size(179, 20);
            this.txt_type_ip_value.TabIndex = 8;
            this.txt_type_ip_value.Click += new System.EventHandler(this.txt_type_ip_value_Click);
            this.txt_type_ip_value.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // btn_load_gmail
            // 
            this.btn_load_gmail.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btn_load_gmail.BackColor = System.Drawing.Color.LimeGreen;
            this.btn_load_gmail.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_load_gmail.ForeColor = System.Drawing.SystemColors.HighlightText;
            this.btn_load_gmail.Location = new System.Drawing.Point(309, 342);
            this.btn_load_gmail.Name = "btn_load_gmail";
            this.btn_load_gmail.Size = new System.Drawing.Size(96, 34);
            this.btn_load_gmail.TabIndex = 2;
            this.btn_load_gmail.Text = "Load Gmail";
            this.btn_load_gmail.UseVisualStyleBackColor = false;
            this.btn_load_gmail.Click += new System.EventHandler(this.btn_load_gmail_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(11, 49);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(57, 13);
            this.label5.TabIndex = 3;
            this.label5.Text = "Type Data";
            // 
            // txt_type_data
            // 
            this.txt_type_data.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_type_data.FormattingEnabled = true;
            this.txt_type_data.Items.AddRange(new object[] {
            "File Local",
            "Server Data"});
            this.txt_type_data.Location = new System.Drawing.Point(93, 46);
            this.txt_type_data.Name = "txt_type_data";
            this.txt_type_data.Size = new System.Drawing.Size(601, 21);
            this.txt_type_data.TabIndex = 4;
            this.txt_type_data.Text = "File Local";
            this.txt_type_data.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // txt_token_auth
            // 
            this.txt_token_auth.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_token_auth.Location = new System.Drawing.Point(93, 9);
            this.txt_token_auth.Name = "txt_token_auth";
            this.txt_token_auth.Size = new System.Drawing.Size(601, 20);
            this.txt_token_auth.TabIndex = 9;
            this.txt_token_auth.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // btn_save
            // 
            this.btn_save.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btn_save.BackColor = System.Drawing.Color.Turquoise;
            this.btn_save.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_save.ForeColor = System.Drawing.SystemColors.HighlightText;
            this.btn_save.Location = new System.Drawing.Point(229, 342);
            this.btn_save.Name = "btn_save";
            this.btn_save.Size = new System.Drawing.Size(74, 34);
            this.btn_save.TabIndex = 10;
            this.btn_save.Text = "Save";
            this.btn_save.UseVisualStyleBackColor = false;
            this.btn_save.Click += new System.EventHandler(this.btn_save_Click);
            // 
            // txt_channel
            // 
            this.txt_channel.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_channel.Location = new System.Drawing.Point(93, 260);
            this.txt_channel.Name = "txt_channel";
            this.txt_channel.Size = new System.Drawing.Size(601, 20);
            this.txt_channel.TabIndex = 12;
            // 
            // btn_search
            // 
            this.btn_search.Location = new System.Drawing.Point(12, 260);
            this.btn_search.Name = "btn_search";
            this.btn_search.Size = new System.Drawing.Size(75, 23);
            this.btn_search.TabIndex = 11;
            this.btn_search.Text = "Search";
            this.btn_search.UseVisualStyleBackColor = true;
            this.btn_search.Click += new System.EventHandler(this.btn_search_Click);
            // 
            // btn_extension
            // 
            this.btn_extension.Location = new System.Drawing.Point(12, 185);
            this.btn_extension.Name = "btn_extension";
            this.btn_extension.Size = new System.Drawing.Size(75, 23);
            this.btn_extension.TabIndex = 0;
            this.btn_extension.Text = "Div Ex";
            this.btn_extension.UseVisualStyleBackColor = true;
            this.btn_extension.Click += new System.EventHandler(this.btn_extension_Click);
            // 
            // txt_extension
            // 
            this.txt_extension.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txt_extension.Location = new System.Drawing.Point(93, 187);
            this.txt_extension.Name = "txt_extension";
            this.txt_extension.Size = new System.Drawing.Size(601, 20);
            this.txt_extension.TabIndex = 1;
            this.txt_extension.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // cbb_gmail_status
            // 
            this.cbb_gmail_status.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.cbb_gmail_status.FormattingEnabled = true;
            this.cbb_gmail_status.Items.AddRange(new object[] {
            "live",
            "error",
            "die"});
            this.cbb_gmail_status.Location = new System.Drawing.Point(93, 73);
            this.cbb_gmail_status.Name = "cbb_gmail_status";
            this.cbb_gmail_status.Size = new System.Drawing.Size(328, 21);
            this.cbb_gmail_status.TabIndex = 4;
            this.cbb_gmail_status.Text = "live";
            this.cbb_gmail_status.TextChanged += new System.EventHandler(this.saveDataInput);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(13, 76);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(37, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Status";
            // 
            // btn_start_register
            // 
            this.btn_start_register.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btn_start_register.BackColor = System.Drawing.SystemColors.WindowText;
            this.btn_start_register.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_start_register.ForeColor = System.Drawing.SystemColors.HighlightText;
            this.btn_start_register.Location = new System.Drawing.Point(515, 342);
            this.btn_start_register.Name = "btn_start_register";
            this.btn_start_register.Size = new System.Drawing.Size(179, 34);
            this.btn_start_register.TabIndex = 2;
            this.btn_start_register.Text = "Register";
            this.btn_start_register.UseVisualStyleBackColor = false;
            this.btn_start_register.Click += new System.EventHandler(this.btn_start_register_Click);
            // 
            // cbb_very_phone
            // 
            this.cbb_very_phone.AutoSize = true;
            this.cbb_very_phone.Checked = true;
            this.cbb_very_phone.CheckState = System.Windows.Forms.CheckState.Checked;
            this.cbb_very_phone.Location = new System.Drawing.Point(611, 311);
            this.cbb_very_phone.Name = "cbb_very_phone";
            this.cbb_very_phone.Size = new System.Drawing.Size(79, 17);
            this.cbb_very_phone.TabIndex = 14;
            this.cbb_very_phone.Text = "very phone";
            this.cbb_very_phone.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(709, 404);
            this.Controls.Add(this.cbb_very_phone);
            this.Controls.Add(this.txt_channel);
            this.Controls.Add(this.btn_search);
            this.Controls.Add(this.btn_save);
            this.Controls.Add(this.txt_token_auth);
            this.Controls.Add(this.txt_type_ip_value);
            this.Controls.Add(this.txt_type_ip);
            this.Controls.Add(this.progressBar1);
            this.Controls.Add(this.lbl_status);
            this.Controls.Add(this.cbb_gmail_status);
            this.Controls.Add(this.txt_type_data);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btn_start_register);
            this.Controls.Add(this.btn_load_gmail);
            this.Controls.Add(this.btn_load_setting);
            this.Controls.Add(this.txt_extension);
            this.Controls.Add(this.btn_extension);
            this.Controls.Add(this.txt_chrome);
            this.Controls.Add(this.btn_div_chrome);
            this.Controls.Add(this.txt_gmail);
            this.Controls.Add(this.btn_file_gmail);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Gmail Register - Chrome";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btn_file_gmail;
        private System.Windows.Forms.TextBox txt_gmail;
        private System.Windows.Forms.Button btn_load_setting;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btn_div_chrome;
        private System.Windows.Forms.TextBox txt_chrome;
        private System.Windows.Forms.Label lbl_status;
        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.ComboBox txt_type_ip;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txt_type_ip_value;
        private System.Windows.Forms.Button btn_load_gmail;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox txt_type_data;
        private System.Windows.Forms.TextBox txt_token_auth;
        private System.Windows.Forms.Button btn_save;
        private System.Windows.Forms.TextBox txt_channel;
        private System.Windows.Forms.Button btn_search;
        private System.Windows.Forms.Button btn_extension;
        private System.Windows.Forms.TextBox txt_extension;
        private System.Windows.Forms.ComboBox cbb_gmail_status;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btn_start_register;
        private System.Windows.Forms.CheckBox cbb_very_phone;
    }
}

