package swing;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.swing.*;

// Ŀ�Ը޼��� �����!
public class DD_cm_generator {
	static String myname = "";
	static String dLocation = System.getProperty("user.home") + "\\Desktop\\commit";
	static String fLocation = System.getProperty("user.home") + "\\Desktop\\commit\\setName.txt";
	
	static public String getTime() {
		LocalDateTime dt = LocalDateTime.now();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String nowTime = "[" + dt.format(dtf) + "]";
		
		return nowTime;
	}
	
	
	public static void main(String args[]) {
		File nameFile = new File(dLocation);
		if(!fileExists()) {
			makeTxt();
		} else {
			myname = readTxt();
			System.out.println(dLocation);
		}
		
		System.out.println(getTime());
		// ������ ����
		JFrame frame = new JFrame("Ŀ�� �޼��� ����");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setLayout(new BorderLayout());
		frame.setSize(350, 400);
		
		Container c = frame.getContentPane();
		
		// �޴��� (�̸� ����)
		JMenuBar mb = new JMenuBar();
		JMenu menu = new JMenu("set");
		JMenuItem saveName = new JMenuItem("�̸� ����");
		mb.add(menu);
		menu.add(saveName);
		
		saveName.addActionListener((e) -> {
			new NameEditor(fLocation);
		});
		
		
		// �г�
		JPanel all = new JPanel();	// ����ð�, �޼��� �гε��� ����
		
		JPanel Pname = new JPanel();	//�̸� �г�
		
		JPanel Pnow = new JPanel();	// ����ð� �г�

		JPanel Ptitle = new JPanel();	// ���� �г�
		
		JPanel Padd = new JPanel();	// �ΰ� �г�
		
		JPanel Pbtn = new JPanel();	// ��ư �г�
		
		
		// ���� ��¥ �� �ð� ǥ��â		
		JLabel latf = new JLabel("���� �ð�");
		JTextField tf = new JTextField(getTime(), 20);
		
		Pnow.add(latf);
		Pnow.add(tf);
		
		JLabel latname = new JLabel("����� �̸�: " + myname);
		Pname.add(latname);
		
		
		// ���� �޼��� --------------------
		JLabel latitle = new JLabel("���� �޼���");
		JTextField title = new JTextField(20);
		
		Ptitle.add(BorderLayout.AFTER_LAST_LINE, latitle);
		Ptitle.add(title);
		
		
		// �߰� �޼��� textarea --------------------------
		JLabel laadd = new JLabel("�ΰ� �޼���");
		JTextArea add = new JTextArea(7, 20);

		Padd.add(laadd);
		Padd.add(add);
		
		
		
		// ���� ���� ��ư --------------------------------
		JButton reset = new JButton("reset");
		Pbtn.add(reset);
		
		reset.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {	
				
				System.out.println(getTime());
				
				tf.setText(getTime());
				title.setText("");
				add.setText("");
			}
		});
		
		
		// ���ΰ�ħ ��ư ---------------------------
		JButton newMsg = new JButton("update");
		newMsg.setSize(100, 30);
		
		Pbtn.add(newMsg);
		
		newMsg.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {				
				
				System.out.println(getTime());
				
				myname = readTxt();
				latname.setText("����� �̸�: " + myname);
				tf.setText(getTime());
			}
		});
		
		// Ŭ�����忡 ���� ------------------------------
		JButton copy = new JButton("copy");
		Pbtn.add(copy);
		
		copy.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {				
				String time = getTime();
				String name = "�̼���";
				String ctitle = title.getText();
				String cadd = add.getText();
				
				String str = time + " " + myname;
				
				if (!ctitle.isEmpty() && !ctitle.equals("") && ctitle != null) {
					str += " : " + ctitle + "\n\n" + cadd;
				}
				
				System.out.println(str);
				
				Toolkit toolkit = Toolkit.getDefaultToolkit();
				Clipboard clipboard = toolkit.getSystemClipboard();
				StringSelection strSel = new StringSelection(str);
				clipboard.setContents(strSel, null);
			}
		});
		
		
		// ��ư �� �����
		JLabel memo = new JLabel("�̸��� ������ �ڿ��� 'update'��ư�� �����ּ���");
		
		// ���̾ƿ� ------------------------
		c.add(BorderLayout.NORTH, mb);
		c.add(BorderLayout.SOUTH, Pbtn);
		c.add(all);
		all.add(Pname);
		all.add(Pnow);
		all.add(Ptitle);
		all.add(Padd);
		all.add(memo);
		
		frame.setVisible(true);

	}

	/**
	 * 1. �ؽ�Ʈ������ �ִ��� Ȯ���Ѵ�.
	 * 2. ������ ����� ù �ٿ� ���� ������ �ִ´�
	 * 3. ����° �ٿ� �̸��� �����Ѵ�.
	 * @throws IOException
	 */

	
	public static String readTxt() {
		String ename = "";
		// �ҷ�����
		try (BufferedReader reader = new BufferedReader(new FileReader(fLocation))){
			StringBuilder text = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				if(line.startsWith("!!")) {
					ename = line.substring(9);
//					ename = line.toString();
					System.out.println(ename);
				}
				text.append(line).append("\n");
				System.out.println(text);
			}
			
//			reader.close();
		}catch (IOException ex) {
			ex.printStackTrace();
		}
		
		return ename;
	}
	
	public static boolean fileExists() {
		File txtDir = new File(dLocation);
		if (!txtDir.exists()) {
			return false;
		}else {
			return true;			
		}
	}
	
	public static void makeTxt() {
		File fileDir = new File(dLocation);
		File txtFile = new File(fLocation);	
		BufferedWriter bw;
		
		try {
			fileDir.mkdir();	// ���� ����
			txtFile.createNewFile();	// ���ο� �ؽ�Ʈ���� ����
			bw = new BufferedWriter(new FileWriter(txtFile, true));
			
			bw.write("�ش� �ؽ�Ʈ ������ �׳� �̸��� �����ϱ� ���� �����Դϴ�. \n"
					+ "����ŵ� �����ϸ� ���α׷��� �����ϸ� �ڵ����� �ٽ� �����˴ϴ�. \n"
					+ "name�� ��ĭ�� ������ �̸��� �����ּ���. \n"
					+ "!!-name: ");
			
			bw.flush();
			bw.close();
			System.out.println("���� �Ϸ�");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}


// �̸��� �����ϴ� ����������
class NameEditor extends Frame {
	
	public NameEditor(String filePath) {
		
//		������ �ϳ��� ����ǵ��� �ϱ�,,!
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				dispose();
			}
		});
		
		setBounds(0, 0, 300, 150);
		
		String originalName = DD_cm_generator.readTxt();
		
		JTextField tf = new JTextField(20);
		tf.setText(originalName);	// ����Ǿ��ִ� �̸�
		
		
		JButton saveButton = new JButton("����");
	
		saveButton.addActionListener(e -> {

			if(filePath != null) {
				try (BufferedReader reader = new BufferedReader(new FileReader(filePath))){
					StringBuilder text = new StringBuilder();
					String line;
					while ((line = reader.readLine()) != null) {
						if(line.startsWith("!!")) {
							continue;
						}
						text.append(line).append("\n");
						System.out.println(text);
					}
					text.append("!!-name: " + tf.getText());
					
					// ������ ������ ������
					File newFile = new File(filePath);
					FileWriter fw = new FileWriter(newFile, false);	// false�� �����!
					
					fw.write(text.toString());
					
					fw.flush();
					
					reader.close();
					fw.close();
				}catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		});

		JPanel panel = new JPanel();
//		panel.add(saveButton);
//		
//		
//		add(panel, BorderLayout.SOUTH);
		
		panel.add(tf);
		panel.add(saveButton);
		
		add(panel);
		setVisible(true);
		
		
	}
	
}
