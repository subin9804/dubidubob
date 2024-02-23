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

// 커밋메세지 만들기!
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
		// 프레임 생성
		JFrame frame = new JFrame("커밋 메세지 복사");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setLayout(new BorderLayout());
		frame.setSize(350, 400);
		
		Container c = frame.getContentPane();
		
		// 메뉴바 (이름 저장)
		JMenuBar mb = new JMenuBar();
		JMenu menu = new JMenu("set");
		JMenuItem saveName = new JMenuItem("이름 저장");
		mb.add(menu);
		menu.add(saveName);
		
		saveName.addActionListener((e) -> {
			new NameEditor(fLocation);
		});
		
		
		// 패널
		JPanel all = new JPanel();	// 현재시간, 메세지 패널들이 속함
		
		JPanel Pname = new JPanel();	//이름 패널
		
		JPanel Pnow = new JPanel();	// 현재시간 패널

		JPanel Ptitle = new JPanel();	// 제목 패널
		
		JPanel Padd = new JPanel();	// 부가 패널
		
		JPanel Pbtn = new JPanel();	// 버튼 패널
		
		
		// 현재 날짜 및 시간 표시창		
		JLabel latf = new JLabel("현재 시간");
		JTextField tf = new JTextField(getTime(), 20);
		
		Pnow.add(latf);
		Pnow.add(tf);
		
		JLabel latname = new JLabel("저장된 이름: " + myname);
		Pname.add(latname);
		
		
		// 제목 메세지 --------------------
		JLabel latitle = new JLabel("제목 메세지");
		JTextField title = new JTextField(20);
		
		Ptitle.add(BorderLayout.AFTER_LAST_LINE, latitle);
		Ptitle.add(title);
		
		
		// 추가 메세지 textarea --------------------------
		JLabel laadd = new JLabel("부가 메세지");
		JTextArea add = new JTextArea(7, 20);

		Padd.add(laadd);
		Padd.add(add);
		
		
		
		// 전부 삭제 버튼 --------------------------------
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
		
		
		// 새로고침 버튼 ---------------------------
		JButton newMsg = new JButton("update");
		newMsg.setSize(100, 30);
		
		Pbtn.add(newMsg);
		
		newMsg.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {				
				
				System.out.println(getTime());
				
				myname = readTxt();
				latname.setText("저장된 이름: " + myname);
				tf.setText(getTime());
			}
		});
		
		// 클립보드에 복사 ------------------------------
		JButton copy = new JButton("copy");
		Pbtn.add(copy);
		
		copy.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {				
				String time = getTime();
				String name = "이수빈";
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
		
		
		// 버튼 위 설명라벨
		JLabel memo = new JLabel("이름을 변경한 뒤에는 'update'버튼을 눌러주세요");
		
		// 레이아웃 ------------------------
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
	 * 1. 텍스트파일이 있는지 확인한다.
	 * 2. 없으면 만들고 첫 줄에 파일 설명을 넣는다
	 * 3. 세번째 줄에 이름을 지정한다.
	 * @throws IOException
	 */

	
	public static String readTxt() {
		String ename = "";
		// 불러오기
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
			fileDir.mkdir();	// 폴더 생성
			txtFile.createNewFile();	// 내부에 텍스트파일 생성
			bw = new BufferedWriter(new FileWriter(txtFile, true));
			
			bw.write("해당 텍스트 파일은 그냥 이름을 저장하기 위한 파일입니다. \n"
					+ "지우셔도 무방하며 프로그램을 실행하면 자동으로 다시 생성됩니다. \n"
					+ "name의 빈칸에 저장할 이름을 적어주세요. \n"
					+ "!!-name: ");
			
			bw.flush();
			bw.close();
			System.out.println("생성 완료");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}


// 이름을 저장하는 서브프레임
class NameEditor extends Frame {
	
	public NameEditor(String filePath) {
		
//		프레임 하나만 종료되도록 하기,,!
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				dispose();
			}
		});
		
		setBounds(0, 0, 300, 150);
		
		String originalName = DD_cm_generator.readTxt();
		
		JTextField tf = new JTextField(20);
		tf.setText(originalName);	// 저장되어있는 이름
		
		
		JButton saveButton = new JButton("저장");
	
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
					
					// 수정된 데이터 덮어씌우기
					File newFile = new File(filePath);
					FileWriter fw = new FileWriter(newFile, false);	// false는 덮어쓰기!
					
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
